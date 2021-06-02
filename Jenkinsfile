node {
    try {
        withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'aws-cli', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                withEnv(["AWS_ELB_DNS=${sh(script: 'aws elbv2 --region us-west-1 describe-load-balancers --query LoadBalancers[*].DNSName --output text', returnStdout: true).trim()}",
                        'serviceName=boss-public-ui']) {

                stage('Checkout') {
                    echo "Checking out $serviceName"
                    checkout scm
                }

                stage('Build') {
                    nodejs('NodeJS') {
                        echo "Building $serviceName"
                        sh 'npm install'
                        sh 'cd src/environments && echo "export const environment = { production: true, apiUrl: \\\"http://$AWS_ELB_DNS\\\", };" > environment.prod.ts'
                        sh 'ng build --prod --base-href ./'
                    }
                }

                stage('Push to S3') {
                    echo "Pushing to s3"
                    sh 'aws s3 cp --recursive dist/$serviceName s3://$serviceName/'
                }
            }
        }
    }
    catch (exc) {
        echo "$exc"
    } finally {
        stage('Cleanup') {
            echo "cleanup"
            sh 'rm -rf *'
        }
    }
}