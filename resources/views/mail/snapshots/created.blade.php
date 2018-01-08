@component('mail::message')
# Snapshots created

##The following snapshots were created:

<ul>
@foreach ($volumes as $volume)
    <li>{{ $volume->code }} : {{ $volume->description }}</li>
@endforeach
</ul>

@component('mail::button', ['url' => url('/') ])
Go to app
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

