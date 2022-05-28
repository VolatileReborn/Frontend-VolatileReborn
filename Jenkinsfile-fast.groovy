node("slave_ldl") {
    def workspace = pwd()

    def git_branch = 'master'
    def git_repository = 'git@git.nju.edu.cn:191820133/frontend-volatile.git'
    def vm_ip = '124.222.135.47'
    def vm_port = '22'
    def vm_user = 'lyk'

    def vm_project_place = "/usr/local/src"
    def vm_target_place = "/usr/local/src/target/"


    def IMAGE_NAME = 'volatile_frontend'
    def IMAGE_NAME_WITH_TAG = 'volatile_frontend:latest'
    def IMAGE_TO_RUN = 'lyklove/volatile_frontend:latest'
    def CONTAINER_NAME = 'volatile_frontend'
    def SERVICE_NAME = 'volatile_frontend_svc'

    stage('clone from gitlab into slave\'s workspace') {
        echo "workspace: ${workspace}"
        git branch: "${git_branch}", url: "${git_repository}"
    }


    stage('cd to build context') {
        echo "the context now is:"
        sh "ls -al"
        sh "cd ${workspace}"
        echo "cd to build context, now the context is:"
        sh "ls -al"

    }
    stage('get version info'){
        sh 'node -v'
        sh 'npm -v'
        sh 'vue -V'
    }
    stage('build with npm') {

//         sh 'npm config set registry http://registry.cnpmjs.org'
        sh ''
        sh 'npm install -g @vue/cli'
        sh 'npm install vue@next'
        sh 'npm install --registry=https://registry.npm.taobao.org'
        sh 'npm list vue'
        sh 'npm run build'
        echo "build finish on ${vm_ip}"
    }

//     stage('npm run serve'){
//
//         echo 'not using docker yet!!'
//         sh 'npm run serve'
//     }


    stage("build docker image"){
        sh "docker build -t ${IMAGE_NAME} --no-cache ."
//         sh "imageId=`docker images | grep #{IMAGE_NAME} | awk '{print $3}'`"
    }

//     stage("login to dockerhub"){
//         withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_KEY', passwordVariable: 'password', usernameVariable: 'username')]) {
//             sh 'docker login -u $username -p $password'
//         }
//     }

    stage("push to dockerhub"){
//         echo "begin push to dockerhub"
        sh "docker image tag ${IMAGE_NAME_WITH_TAG} ${IMAGE_TO_RUN}"
//         sh "docker image push lyklove/${IMAGE_NAME_WITH_TAG}"
    }
    stage("clean previous image and container. Deprecated: 该功能不需要了，因为现在是Docker Service "){
        sh "docker container rm -f ${CONTAINER_NAME}"
//         sh "docker image rm ${IMAGE_NAME_WITH_TAG}"
//         sh "docker image rm ${IMAGE_TO_RUN}"
    }
//     stage( "pull image" ){
//         sh "docker pull  lyklove/${IMAGE_NAME_WITH_TAG}"
//     }
//    stage("run container volatile_frontend") {
//        sh "docker image ls"
//        sh "docker container run --name ${CONTAINER_NAME} --net=host -d  ${IMAGE_TO_RUN}"
//    }
    stage("update service by built image"){
        sh "docker service update --image ${IMAGE_TO_RUN} --update-parallelism 2  --update-delay 2s ${SERVICE_NAME}"
    }

    stage("signal gitlab: deployed"){
        updateGitlabCommitStatus name: 'deployed', state: 'success'
    }
}


