import { useContext } from "react"
import { Badge, Button, ListGroup, Spinner } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import userService from "../../services/user.service"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import {MessageContext} from "../../context/message.context"



const WishPitchesList = ({ userProfile, refreshFavPitches }) => {

    const { isLoggedIn } = useContext(AuthContext)
    const { setShowMessage, setMessageInfo } = useContext(MessageContext)

    const addDonePitch = (pitch_id) => {
        userService
            .addDonePitches(pitch_id)
            .then(() => {
                setShowMessage(true)
                setMessageInfo({ title: 'Vía compleata', desc: 'Enhorabuena bicho!' })
            })
            .catch(err => console.log(err))
    }

    const removeWishPitch = (pitch_id) => {
        userService
            .removeWishPitches(pitch_id)
            .then(() => refreshFavPitches())
            .catch(err => console.log(err))
    }

    return (

        userProfile ?
            <>
                <h1> Aquí están las vías que quieres hacer {userProfile.username}!</h1>

                <ListGroup as="ol" numbered>
                    {userProfile.wishPitches?.map(elm => {
                        return (
                            <ListGroup.Item
                                as="li"
                                className="d-flex justify-content-between align-items-start"
                                key={elm._id}
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{elm.name}</div>
                                    <p>Metros: {elm.meters} | Cintas: {elm.quickdraws} </p>
                                </div>

                                {isLoggedIn && <IconButton aria-label="favorite" size="large" onClick={() => addDonePitch(elm._id)}>
                                    <CheckCircleIcon fontSize="inherit" />
                                </IconButton>}

                                {isLoggedIn && <IconButton aria-label="favorite" size="large" onClick={() => removeWishPitch(elm._id)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>}






                                <Badge variant="primary" pill>
                                    {elm.diff}
                                </Badge>
                            </ListGroup.Item>

                        )

                    })}
                </ListGroup>
            </>
            :
            
            <Spinner animation="border" />


    )

}

export default WishPitchesList

