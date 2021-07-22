import React, {useState, useCallback, useEffect} from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {getCroppedImg} from '../js/canvasUtils'
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const UploadImage = ({ uploadProfilePicture, getStates, setStates, profilePictureStatus}) => {
    const classes = useStyles();
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [hideButton, setHideButton] = useState(true);

    useEffect(() => {
        setHideButton(!(profilePictureStatus === 0));
    }, [profilePictureStatus]);


    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            setStates("setCroppedImage", URL.createObjectURL(croppedImage));
            setStates("setImage", croppedImage);
        } catch (e) {
            console.error(e);
        }
    }, [imageSrc, croppedAreaPixels, rotation]);

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = await readFile(file);
            setImageSrc(imageDataUrl);
        }
    }

    const choiceImage = () => {
        if (!imageSrc) {
            document.getElementById("choiceImage").click();
        }
    }

    return (
        <div>

            {
                profilePictureStatus === 0 ? (
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                        <Button disabled={hideButton} variant="contained" color="primary" component="span" data-toggle="modal"
                                data-target="#uploadImage"
                                data-backdrop='static' data-keyboard='false' onClick={!hideButton ? choiceImage : null}>
                            Elegir foto
                        </Button>
                        {getStates("croppedImage" && getStates("image")) ? (<Button onClick={uploadProfilePicture}>Subir foto</Button>) : null}
                    </ButtonGroup>
                ) : null
            }

            <div className="modal fade" id="uploadImage" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content py-0">

                        <div className="modal-header">
                            <h5 className="modal-title-dashboard" id="exampleModalLabel">Adapta tu imagen</h5>
                            <button type="button" className="close-modal" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <React.Fragment>
                                <div className={classes.cropContainer}>
                                    <Cropper
                                        image={imageSrc}
                                        crop={crop}
                                        rotation={rotation}
                                        zoom={zoom}
                                        aspect={4 / 4}
                                        onCropChange={setCrop}
                                        onRotationChange={setRotation}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                    />
                                </div>
                                <div className={classes.controls}>
                                    <div className={classes.sliderContainer}>
                                        <Typography
                                            variant="overline"
                                            classes={{root: classes.sliderLabel}}
                                        >
                                            Zoom
                                        </Typography>
                                        <Slider
                                            value={zoom}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            aria-labelledby="Zoom"
                                            classes={{root: classes.slider}}
                                            onChange={(e, zoom) => setZoom(zoom)}
                                        />
                                    </div>
                                    <Button
                                        onClick={showCroppedImage}
                                        variant="contained"
                                        color="primary"
                                        classes={{root: classes.cropButton}}
                                        data-dismiss="modal" aria-label="Close"
                                    >
                                        Finalizar
                                    </Button>
                                </div>
                                <input type="file" hidden id="choiceImage" onChange={onFileChange} accept="image/*"/>
                                <label htmlFor="choiceImage">
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera/>
                                    </IconButton>
                                </label>
                            </React.Fragment>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const readFile = file => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

const useStyles = makeStyles((theme) => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        background: '#333',
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        flexShrink: 0,
        marginLeft: 16,
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    sliderLabel: {
        [theme.breakpoints.down('xs')]: {
            minWidth: 65,
        },
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 16,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px',
        },
    },
}))


export default UploadImage;
