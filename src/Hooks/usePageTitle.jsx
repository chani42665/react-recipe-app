import { useEffect } from 'react'

function usePageTitle(title) {
  useEffect(() => {
    document.title = `Sweet Heart - ${title}`
  }, [title])
}

export default usePageTitle
