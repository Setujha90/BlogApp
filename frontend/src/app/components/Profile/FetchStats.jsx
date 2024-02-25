import React from 'react'

const FetchStats = ({id}) => {

    useEffect(() => {
        async function updateStats(){
          const user = await userById(id)
          setUser(user)
    
          
        }
      }, [isFollowed])

  return (
    <div>
      
    </div>
  )
}

export default FetchStats
