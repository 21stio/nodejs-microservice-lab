 node ('infrastructure'){
  checkout scm

  stage 'Lint'
  sh 'docker-compose run test gulp tslint'
 }