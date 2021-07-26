pipeline {
    agent any
    environment {
        serviceName = "boss-public-ui"
    }
    tools {
        nodejs 'nodejs'
    }
    stages {
        stage('Npm Build') {
            environment {
                AWS_ELB_DNS = sh(script: 'aws elbv2 --region us-east-2 describe-load-balancers --query "LoadBalancers[?LoadBalancerName==\'ssor-alb\'].DNSName" --output text', returnStdout: true).trim()
            }
            steps {
                echo "Building $serviceName"
                sh 'npm install'
                sh 'cd src/environments && echo "export const environment = { production: true, apiUrl: \\\"http://$AWS_ELB_DNS\\\", };" > environment.prod.ts'
                sh 'ng build --prod --base-href /'
            }
        }
        stage('Push to S3') {
            steps {
                echo "Pushing to s3"
                sh 'aws s3 sync dist/$serviceName s3://www.bankofsmoothstack.com/'
            }
        }
    }
    post {
        cleanup {
            cleanWs()
        }
    }
}