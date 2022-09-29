node("slave1") {
    def workspace = pwd()

    def git_branch = 'master'

    // def git_repository = 'git@git.nju.edu.cn:191820133/frontend-volatile.git' //Gitlab
    def git_repository = 'git@github.com:VolatileReborn/Frontend-VolatileReborn.git' //Github

    def vm_ip = '124.222.135.47'
    def vm_port = '22'
    def vm_user = 'lyk'

    def __vm_project_place = "/usr/local/src"
    def __vm_target_place = "/usr/local/src/target/"

    def __PROJECT_NAME = 'volatile_reborn'
    def __PROJECT_TYPE = 'frontend'
    def __DOCKERHUB_ACCOUNT = 'lyklove'
    def __IMAGE_TAG = 'latest'

    def PUBLIC_PORT = '81'
    def CONTAINER_PORT = '80' // 80 for VUE

    def ORIGINAL_IMAGE_NAME = __PROJECT_TYPE + '_' + __PROJECT_NAME //frontend_volatile_reborn
    def IMAGE_NAME_WITH_INITIAL_TAG = ORIGINAL_IMAGE_NAME + ':' + __IMAGE_TAG //frontend_volatile_reborn:latest
    def IMAGE_FULL_NAME = __DOCKERHUB_ACCOUNT + '/' + IMAGE_NAME_WITH_INITIAL_TAG // lyklove/frontend_volatile_reborn:latest

    def CONTAINER_NAME = ORIGINAL_IMAGE_NAME //frontend_volatile_reborn
    def SERVICE_NAME = CONTAINER_NAME + '_svc' //frontend_volatile_reborn_svc

    stage('clone from github into slave\'s workspace. Using branch: ' + "master") {
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
    //@Deprecated
    // stage('get version info'){
    //     sh 'node -v'
    //     sh 'npm -v'
    //     sh 'vue -V'
    // }

//     stage('build with npm') {

// //         sh 'npm config set registry http://registry.cnpmjs.org'
//         // sh 'npm install -g @vue/cli'
//         // sh 'npm install vue@next'
//         sh 'npm install --registry=https://registry.npm.taobao.org' //必须加代理, 不然很慢
//         sh 'npm list vue'
//         sh 'npm run build'
//         echo "build finish on ${vm_ip}"
//     }

//@DEBUG
//     stage('npm run serve'){
//
//         echo 'not using docker yet!!'
//         sh 'npm run serve'
//     }


    stage("build docker image"){
        sh "docker build -t ${ORIGINAL_IMAGE_NAME}  ."
//         sh "imageId=`docker images | grep #{IMAGE_NAME} | awk '{print $3}'`"
    }

    stage("run docker container"){
        sh "docker container run  -p ${PUBLIC_PORT}:${CONTAINER_PORT} --rm --name ${CONTAINER_NAME}  ${IMAGE_NAME_WITH_INITIAL_TAG}"
//         sh "imageId=`docker images | grep #{IMAGE_NAME} | awk '{print $3}'`"
    }

//     stage("login to dockerhub"){
//         withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_KEY', passwordVariable: 'password', usernameVariable: 'username')]) {
//             sh 'docker login -u $username -p $password'
//         }
//     }
//     stage("tag image"){
//         sh "docker image tag ${IMAGE_NAME_WITH_INITIAL_TAG} ${IMAGE_FULL_NAME}"
//     }

//     stage("push to dockerhub"){
// //         echo "begin push to dockerhub"
// //         sh "docker image push lyklove/${IMAGE_NAME_WITH_TAG}"
//     }

    // stage("clean previous image and container. Deprecated: 该功能不需要了, 因为现在是Docker Service "){
    //     sh "docker container rm -f ${CONTAINER_NAME}"
//         sh "docker image rm ${IMAGE_NAME_WITH_TAG}"
//         sh "docker image rm ${IMAGE_TO_RUN}"
    // }
//     stage( "pull image" ){
//         sh "docker pull  lyklove/${IMAGE_NAME_WITH_TAG}"
//     }
//    stage("run container volatile_frontend") {
//        sh "docker image ls"
//        sh "docker container run --name ${CONTAINER_NAME} --net=host -d  ${IMAGE_TO_RUN}"
//    }

    // stage("update service by built image"){
    //     sh "docker service update --image ${IMAGE_TO_RUN} --update-parallelism 2  --update-delay 2s ${SERVICE_NAME}"
    // }

    // //Gitlab
    // stage("signal github: deployed"){
    //     echo 'Notify GitLab'
    //     updateGitlabCommitStatus name: 'build', state: 'pending'
    //     updateGitlabCommitStatus name: 'build', state: 'success'
    // }
}


