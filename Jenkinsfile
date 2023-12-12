pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Front Install') { 
            steps {
                sh 'cd react18'
                sh 'npm install' 
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}