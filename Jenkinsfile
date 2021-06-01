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
            stage('Deploy') {
                withAWS(region: 'us-west-1', credentials: 'aws_credentials') {
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