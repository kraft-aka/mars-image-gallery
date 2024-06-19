import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './ImagePage.module.css'

const ImagePage = () => {

  const { id } = useParams();
  console.log(id)
  return (
    <div>ImagePage</div>
  )
}

export default ImagePage