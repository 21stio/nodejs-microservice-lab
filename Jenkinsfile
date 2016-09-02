node ('infrastructure'){
  checkout scm

  try {
    stage 'Build'
    sh 'docker-compose build base'

    stage 'Lint'
    sh 'docker-compose up test'
  } finally {
    stage 'Lint'
    sh 'docker-compose up test'
  }
}