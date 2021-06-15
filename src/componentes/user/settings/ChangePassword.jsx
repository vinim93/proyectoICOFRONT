import React from 'react';
import {Button, TextField} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const ChangePassword = () => {
    return (
        <div>
            <form >
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <TextField variant="outlined" required
                                       fullWidth id="outlined-basic" label="Contraseña anterior"
                                       style={{alignContent: "center"}}
                                       />
                        </div>
                        <div className="col-12 mb-3">
                            <TextField variant="outlined" required
                                       fullWidth id="outlined-basic" label="Contraseña nueva"
                                       style={{alignContent: "center"}}
                            />
                        </div>
                        <div className="col-12 mb-3">
                            <TextField variant="outlined" required
                                       fullWidth id="outlined-basic" label="Repetir contraseña nueva"
                                       style={{alignContent: "center"}}
                            />
                        </div>
                        <div className="col-12">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SaveIcon/>}
                                type={"submit"}
                            >
                                Cambiar contraseña
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;