pipeline {
    agent any
    stages {
        stage("build") {
            steps {
                echo 'Building the application'
                echo 'This should trigger jenkins polling'
            }
        }

        stage("test") {
            steps {
                echo 'Testing the application'
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