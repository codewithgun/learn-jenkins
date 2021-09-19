pipeline {
    agent any
    stages {

        stage("build") {
            steps {
                echo 'Building the application'
                nodejs("NodeJS-16.9.1") {
                    sh 'npm install'
                }
            }
        }

        stage("test") {
            steps {
                echo 'Testing the application'
                nodejs("NodeJS-16.9.1") {
                    sh 'npm run test'
                }
            }
        }

        stage("e2e-test") {
            steps {
                echo 'E2E test start'
                nodejs("NodeJS-16.9.1") {
                    sh 'npm run test:e2e'
                }
            }
        }

        stage("build-image") {
            steps {
                echo 'Building docker image'
            }
        }

        stage("deploy") {
            steps {
                echo 'Deploying the application'
            }
        }
    }
}