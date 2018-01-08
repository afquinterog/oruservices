<?php

namespace App\Models\Helpers;


class Time{

	
	/**
   * Time Ago
   *
   * @param $datetime mysql datetime format
   * @param $full - return full datetime or not
   *           
   * @return datetime - time ago 
   */
  public static function timeAgo($datetime, $full = false){ 
    date_default_timezone_set('Etc/GMT+4');
    $now = new \DateTime;
    $ago = new \DateTime($datetime);

  
    $diff = $now->diff($ago);
    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = [
        'y' => 'Year',
        'm' => 'Month',
        'w' => 'Week',
        'd' => 'Day',
        'h' => 'Hour',
        'i' => 'Minute',
        's' => 'Second',
    ];

    foreach ($string as $k => &$v) 
    {
        if ($diff->$k) 
        {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? ' ' : '');
        } 
        else 
        {
            unset($string[$k]);
        }
    }

    if ( ! $full)
    {
        $string = array_slice($string, 0, 1);   
    } 

    return $string ? implode(', ', $string) . '' : 'just now';      
  }
}