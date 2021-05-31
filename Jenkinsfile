node {
    try {
        nodejs('NodeJS'){
                    sh 'npm --version'
                    sh 'ng --version'
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