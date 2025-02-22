import { useState } from 'react'
import { useEffect } from 'react'
import heartEmpty from '../../assets/heartEmpty.png'
import heartFull from '../../assets/heartFull.png'
import styled from 'styled-components'

const LikeLign = styled.div`
  display: flex;
  align-items: center;
`

const ButtonHeart = styled.img`
  height: 35px;
  &:hover {
    cursor: pointer;
  }
`

const LikeCount = styled.p`
  font-size: 14px;
  padding-left: 10px;
  margin: 0;
`

function LikeButton({ postId }) {
  const [isLiked, setIsLiked] = useState(false)

  const [changeOnLike, setChangeOnLike] = useState(null)

  useEffect(() => {
    if (changeOnLike !== null) {
      if (changeOnLike === true) {
        fetch('http://localhost:3000/api/like', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
          body: JSON.stringify({ postId }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          .then(function (value) {
            setIsLiked(true)
          })
          .catch(function (err) {
            console.log(err)
          })
      } else if (changeOnLike === false) {
        fetch(`http://localhost:3000/api/like/${postId}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${login.token}`,
          },
          body: JSON.stringify({ postId }),
        })
          .then(function (res) {
            if (res.ok) {
              return res.json()
            }
          })
          .then(function (value) {
            setIsLiked(false)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }, [changeOnLike]) // eslint-disable-line react-hooks/exhaustive-deps

  let login = JSON.parse(localStorage.getItem('login'))

  useEffect(() => {
    let login = JSON.parse(localStorage.getItem('login'))
    fetch(`http://localhost:3000/api/like/${postId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${login.token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((likesData) => {
          setLikeCount(likesData.length)
          if (likesData.length) {
            const like = likesData.find((e) => e.userId === login.userId)
            if (like) {
              setIsLiked(true)
            }
          }
        })
        .catch((error) => console.log(error))
    )
  }, [isLiked]) // eslint-disable-line react-hooks/exhaustive-deps

  const [likeCount, setLikeCount] = useState()

  const isPlural = likeCount > 1 ? true : false

  if (likeCount === 0) {
    return isLiked ? (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur plein"
          src={heartFull}
          onClick={() => {
            setChangeOnLike(false)
          }}
        />
      </LikeLign>
    ) : (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur vide"
          src={heartEmpty}
          onClick={() => {
            setChangeOnLike(true)
          }}
        />
      </LikeLign>
    )
  } else {
    return isLiked ? (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur plein"
          src={heartFull}
          onClick={() => {
            setChangeOnLike(false)
          }}
        />
        <LikeCount>
          {likeCount} {isPlural ? 'personnes ont liké' : 'personne a liké'}
        </LikeCount>
      </LikeLign>
    ) : (
      <LikeLign>
        <ButtonHeart
          alt="Bouton coeur vide"
          src={heartEmpty}
          onClick={() => {
            setChangeOnLike(true)
          }}
        />
        <LikeCount>
          {likeCount} {isPlural ? 'personnes ont liké' : 'personne a liké'}
        </LikeCount>
      </LikeLign>
    )
  }
}

export default LikeButton
