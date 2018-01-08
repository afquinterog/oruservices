<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ServerThresholdReached extends Notification implements ShouldQueue
{
    /**
     * Notification messages         
     * @var string
     */
    private $messages;

    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($messages)
    {
        $this->messages = $messages;    
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $mail = new MailMessage;
        $mail->subject( "Mkit Server threshold reached" );

        //Add server messages
        foreach($this->messages as $message){
            $mail->line( $message );
        }

        $mail
            ->action('Go to server status application', 'http://serverstatus.mkitdigital.com')
            ->line('')
            ->error( );

        return  $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
