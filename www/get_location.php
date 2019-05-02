<?php

if( !empty($_POST) )
{
    $selected_text= $_POST['selected_text'];

    $xml= simplexml_load_file('xml/geomap.xml');


    foreach($xml->children() as $hospital)
    {

        $h_child = $hospital->children();
        $text = (string)$h_child->name;

        if($selected_text == $text)
        {
            $array = [
                'lati' => $hospital->latitude,
                'longi' => $hospital->longitude
            ];

            echo json_encode($array);
            //convert array into json
        }
    }
}

?>
