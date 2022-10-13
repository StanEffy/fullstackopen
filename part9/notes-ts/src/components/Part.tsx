import React from 'react';
import {CoursePart} from "../types";

const Part = ({part}:{part: CoursePart}):React.ReactElement | null => {
     switch (part.type) {
        case "normal":
            return (<>
                <h4>{part.name}</h4>
                <p>Total exercises {part.exerciseCount}</p>
                <p>{part.description}</p>
            </>)
         case "groupProject":
             return (
                 <>
                     <h4>{part.name}</h4>
                     <p>Total exercises {part.exerciseCount}</p>
                     <p>Group project count {part.groupProjectCount}</p>
                 </>
             )
         case "submission":
             return (
                 <>
                    <h4>{part.name}</h4>
                     <p>Total exercises {part.exerciseCount}</p>
                     <p>{part.description}</p>
                     <a href={part.exerciseSubmissionLink}>submit link</a>
                 </>
             )
         case "special":
             return (
                 <>
                     <h4>{part.name}</h4>
                     <p>Total exercises {part.exerciseCount}</p>
                     <p>{part.description}</p>
                     <p>required skills:
                         {part.requirements.map(r => <span key={part.name + r}>{r} </span>)}
                     </p>
                 </>
             )
         default:
             return null
    }
};

export default Part;
