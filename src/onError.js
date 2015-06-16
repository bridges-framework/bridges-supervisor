export default function onError(error, restart, crash) {
  console.log('bridges:supervisor:error:message', error.message)
  console.log('bridges:supervisor:error:stack'  , error.stack)
  console.log('bridges:supervisor:restart')
  restart()
}

