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