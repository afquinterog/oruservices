@servers(['statusServer' => 'ubuntu@52.25.67.96', 'bioscannUi' => 'ubuntu@35.165.87.187', 'ausUiProd' => 'ubuntu@54.66.139.193', 'ausApiProd' => 'ubuntu@52.65.161.6', 'ausDbProd' => 'ubuntu@52.65.232.243', 'ausWpProd' => 'ubuntu@52.65.45.101', 'MkitNginxStaticServer' => 'ubuntu@35.160.93.165', 'serverStatus2'=>'127.0.0.1', 'ausApiDevelop' => 'ubuntu@13.55.174.197', 'ausUiDev' => 'ubuntu@13.55.79.1', 'ausDbDev' => 'ubuntu@13.54.152.150', 'MkitDevServer' => 'ubuntu@52.38.87.120', "dockerStageApiEntoro" => 'ubuntu@34.214.30.146'  ])

@task('deploy-app-backup-server', ['on' => 'statusServer'])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-app-bioscann-ui-production', ['on' => 'bioscannUi'])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-aus-prod-ui', ['on' => 'ausUiProd' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-aus-dev-ui', ['on' => 'ausUiDev' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-aus-prod-api', ['on' => 'ausApiProd' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-aus-prod-db', ['on' => 'ausDbProd' ])
	cd {{ $route }}
    sudo git pull origin {{ $branch }}
@endtask

@task('deploy-aus-prod-wp-core', ['on' => 'ausWpProd' ])
	cd {{ $route }}
    sudo git pull origin {{ $branch }}
@endtask

@task('deploy-aus-prod-wp-content', ['on' => 'ausWpProd' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-wonclient-ui-production', ['on' => 'MkitNginxStaticServer' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-connectory-aus-db-dev', ['on' =>'ausDbDev' ])
	cd {{ $route }}
	sudo service solr stop
    sudo git pull origin {{ $branch }}
    sudo service solr start
@endtask

@task('connectory-aus-ui-dev-deploy', ['on' =>'AusApiServer' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('connectory-aus-wp-dev-deploy', ['on' =>'MkitNginxStaticServer' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-serverstatus-production', ['on' =>'serverStatus2' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-aus-develop-api', ['on' => 'ausApiDevelop' ])
	cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('deploy-wordpress-update', ['on' => "$server" ] )
    cd {{ $route }}
    git pull origin {{ $branch }}
@endtask

@task('list-files', ['on' => "$server"   ])
    ls -al
    pwd
@endtask

@task('deploy-docker-image-github', ['on' => "$server" ])
    sudo rm -rf /myapp
    sudo git clone {{ $repo }} /myapp
    cd /myapp
    sudo git checkout {{ $branch }}
    sudo chown -R ubuntu:ubuntu /myapp
    sudo chmod -R 775 /myapp
        
    docker build -t {{ $dockerName }}:latest .
    docker restart {{$dockerName}}
    docker rmi --force $(docker images --quiet --filter "dangling=true")   
@endtask
















