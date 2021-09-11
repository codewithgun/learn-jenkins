pipeline {
    agent any
    stages {
        stage("build") {
            steps: {
                echo 'Building the application'
            }
        }

        stage("test") {
            steps: {
                echo 'Testing the application'
            }
        }

        stage("build-image") {
            steps: {
                echo 'Building docker image'
            }
        }

        stage("deploy") {
            steps: {
                echo 'Deploying the application'
            }
        }
    }
}