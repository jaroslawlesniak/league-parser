<?php

    header("Content-type: application/json; charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    libxml_use_internal_errors (true);

    $url = $_GET['url'];

    $dom = new DOMDocument();
    $dom->loadHTMLFile("http://90minut.pl".$url);
    $finder = new DomXPath($dom);

    $resultTable = $finder->query('//table[@class="main"]');
    $image = $resultTable->item(0)->getElementsByTagName("img");

    if(strpos($image->item(0)->getAttribute("src"), "logo") !== false) {
        $url = $image->item(0)->getAttribute("src");
        echo json_encode(["image" => $url]);
    } else {
        echo json_encode(["image" => 'http://img.90minut.pl/logo/dobazy/empty.gif']);
    }