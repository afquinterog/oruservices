@component('mail::message')
# The application has been deployed


##Application
{{$application}}

##Committer
{{$committer}}

##Branch
{{$branch}}

##Server output
```
{{ $result }}
```

@component('mail::button', ['url' => url('/') ])
Go to app
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
