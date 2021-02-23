pipeline{
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 1, unit: "HOURS")
    }
    stages {
        stage('Redeploy') {
            when { expression { BRANCH_NAME ==~ /(develop)/ }}
            steps {
                sh '''
                    chmod +x           \
                    ./docker-stop.sh    \
                    ./docker-deploy.sh
                '''
                sh './docker-stop.sh'
                sh './docker-deploy.sh https://api1.otakedev.com'
            }
        }
    }
    post{
        always {
        echo 'JENKINS PIPELINE'
        }

        success {
        echo 'JENKINS PIPELINE SUCCESSFUL'
        }

        failure {
        echo 'JENKINS PIPELINE FAILED'
        }

        unstable {
        echo 'JENKINS PIPELINE WAS MARKED AS UNSTABLE'
        }

        changed {
        echo 'JENKINS PIPELINE STATUS HAS CHANGED SINCE LAST EXECUTION'
        }
    }
}
