<?php

    
    header("Content-type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    libxml_use_internal_errors (true);

    $leaguePath = $_GET["id"];

    $dom = new DOMDocument();
    $dom->loadHTMLFile($leaguePath);
    $finder = new DomXPath($dom);

    $resultTables = $finder->query('//table[@class="main2"]');
    $rawLeagueTable = $resultTables->item(0)->getElementsByTagName("tr");

    $leagueTable = [];

    for($i = 4; $i < $rawLeagueTable->length; $i++) {
        $teamData = $rawLeagueTable->item($i)->getElementsByTagName("td");

        $team = [];
        $team["position"] = $i - 3;
        $team["team"] = trim($teamData->item(1)->nodeValue);
        $team["stats"] = [];

        for($j = 2; $j <= 21; $j++) {
            if($teamData->item($j)->nodeValue !== "") {
                $team["stats"][] = trim($teamData->item($j)->nodeValue);
            } else {
                $team["stats"][] = "0";
            }
        }
        $leagueTable[$i - 4] = $team;
    }

    $rawMatchesData = $finder->query('//table[@class="main"]');
    $matches = [];

    for($i = 0; $i < $rawMatchesData->length - 2; $i = $i + 2) {
        $singleMatchDay = $rawMatchesData->item($i);

        $matchDayDate = $singleMatchDay->nodeValue;

        $matchDayInfo = [];
        $matchDayInfo["date"] = trim($matchDayDate);
        $matchDayInfo["pause"] = null;
        $matchDayInfo["matches"] = [];

        $matchDayAllMatches = $rawMatchesData->item($i + 1)->getElementsByTagName("tr");
        $previousMatchIndex = 0;

        for($j = 0; $j < $matchDayAllMatches->length; $j++) {
            $singleMatchInfo = [];
            $singleMatchInfo["home"] = "";
            $singleMatchInfo["guest"] = "";
            $singleMatchInfo["result"] = "";
            $singleMatchInfo["walkover"] = false;
            $singleMatchInfo["info"] = "";

            $match = $matchDayAllMatches->item($j);
            $line = $match->getElementsByTagName("td");

            if($j === 0 && $line->length === 1) {
                $matchDayInfo["pause"] = trim($line->item(0)->nodeValue);
                $j++;
            } 

            if($line->length === 1 && $j > 0) {
                if(trim($line->item(0)->nodeValue) === "(wo)") {
                    $matchDayInfo["matches"][$previousMatchIndex - 1]["walkover"] = true;
                } else {
                    $matchDayInfo["matches"][$previousMatchIndex - 1]["info"] = ucfirst(trim($line->item(0)->nodeValue));
                }
            }

            if(array_key_exists(-1, $matchDayInfo["matches"])) {
                unset($matchDayInfo["matches"][-1]);
            }

            if($line->length > 1) {
                $singleMatchInfo["home"] = trim($line->item(0)->nodeValue);
                $singleMatchInfo["guest"] = trim($line->item(2)->nodeValue);
                $singleMatchInfo["result"] = trim($line->item(1)->nodeValue);
                $matchDayInfo["matches"][$previousMatchIndex] = $singleMatchInfo; 
                $previousMatchIndex++;
            }
        }

        if(sizeof($matchDayInfo["matches"]) > 0) {
            $matches[ceil($i/2)] = $matchDayInfo;
        }
    }

    echo json_encode(["table" => $leagueTable, "match_days" => $matches], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);