#!/bin/sh

sudo supervisorctl restart queue-worker:*

php artisan clear-compiled
composer install
composer dump-autoload -o


