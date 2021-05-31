node {
    try {
        withEnv(['serviceName=boss-public-ui', "commitHash=${sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()}"]) {
            stage('Checkout') {
                echo "Checking out $serviceName"
                checkout scm
            }
            stage('Build') {
                nodejs('NodeJS'){
                            sh 'npm install'
                            sh 'ng build --base-href ./'
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