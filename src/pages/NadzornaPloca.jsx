import { IME_APLIKACIJE } from "../constants";
import slika from '../assets/edunova.svg'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import SmjerService from "../services/smjerovi/SmjerService";
import PolaznikService from "../services/polaznici/PolaznikService";
import GrupaService from "../services/grupe/GrupaService";
import OperaterService from "../services/operateri/OperaterService";

export default function NadzornaPloca() {
    

    return (
        <>
        Logirani ste, ovo je nadzorna ploča
        </>
    )
}
