 node ('infrastructure'){
  checkout scm

  stage 'Build'
  sh 'docker-compose build base'

  stage 'Lint'
  sh 'docker-compose run test gulp tslint'
 }