pipeline{
    agent any
    options {
        disableConcurrentBuilds()
        timeout(time: 1, unit: "HOURS")
    }
    stages {
        stage('Redeploy') {
            environment {
                SEND_PULSE_API_USER_ID="${SEND_PULSE_API_USER_ID}"
                SEND_PULSE_API_SECRET="${SEND_PULSE_API_SECRET}"
                SEND_PULSE_TOKEN_STORAGE="tmp;"
                OTAKE_EMAIL="contact@otakedev.com"
                OTAKE_NAME="Otake"
                SECRET_FOR_PASSWORD="${SECRET_FOR_PASSWORD}"
                SECRET_FOR_TOKEN="${SECRET_FOR_TOKEN}"
            }
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
