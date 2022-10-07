import React from 'react';
import {Gender} from "../types";


import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const GetGenderLabel = ({gender}:{gender:Gender}):React.ReactElement => {
    return gender === Gender.Male ? <MaleIcon /> : gender === Gender.Female ? <FemaleIcon /> : <TransgenderIcon />;
};

export default GetGenderLabel;
