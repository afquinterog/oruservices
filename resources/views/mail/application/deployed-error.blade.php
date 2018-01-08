@component('mail::message')
# Error ocurred when deploying application

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

@component('mail::button', ['url' => url('/') ] )
Go to app
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
