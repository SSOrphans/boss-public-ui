node {
    try {
        withEnv(['serviceName=boss-public-ui', "commitHash=${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"]) {
            stage('Checkout') {
                echo "Checking out $serviceName"
                checkout scm
            }
            stage('Build') {
                nodejs('NodeJS') {
                    echo "Building $serviceName"
                    sh 'npm install'
                    sh 'ng build --base-href ./'
                }
            }
            stage('Push to S3') {
                withAWS(region: 'us-west-1', credentials: 'aws_credentials') {
                    echo "Pushing to s3"
                    sh 'aws s3 ls'
                    sh 'aws s3 cp --recursive dist s3://ssor-test-ui/'
                }
            }
        }
    }
    catch (exc) {
        echo "$exc"
    } finally {
        stage('Cleanup') {
            echo "cleanup"
        }
    }
}