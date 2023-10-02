import Grid from '@mui/material/Grid';

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const handleInput = (value) => {
  return (
    value.replace(phoneRegex, '($1) $2-$3')
  )
}

export default function EditableGridItem(props) {

    const {currentlyEditing, selectedRow, field, label, width, formikProps, type, options} = props;

    return(
        <Grid item>
            <label htmlFor={field}><u>{`${label}:`}</u></label>
            {/* {formikProps.values[field]} */}
            {currentlyEditing ?
            <>
            {/* Text Field */}
            {(type === 'text' || type === 'date') &&
            <>
            <input 
                type={type} 
                name={field}
                value={formikProps.values[field] ? formikProps.values[field] : ''}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                style={{width: width}}
            />
            {field === 'injuryDate1' &&
            <>
            <label htmlFor='injuryDate2'><u>{`DOI2:`}</u></label>
            <input 
                type={type} 
                name='injuryDate2'
                value={formikProps.values.injuryDate2 ? formikProps.values.injuryDate2 : ''}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                style={{width: width}}
            />
            </>
            }
            </>
            }
            {type === 'phone' &&
            <input 
                type={type} 
                name={field}
                value={formikProps.values[field] ? handleInput(formikProps.values[field]) : ''}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                style={{width: width}}
            />
            }
            {/* Text Area */}
            {type === 'textarea' &&
            <textarea
                name={field}
                value={formikProps.values[field] ? formikProps.values[field] : ''}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                rows='4'
                cols='26'
            />
            }
            {/* Select */}
            {type === 'select' &&
            <>
            <select
                name={field}
                value={formikProps.values[field] ? formikProps.values[field] : ''}
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
            >
                {(field === 'clientId' || field === 'employerId') ?
                <>
                    {field === 'clientId' &&
                    <>
                    <option value={selectedRow.clientId}>{selectedRow.client}</option>
                    {options.filter((x) => x.clientId !== selectedRow.clientId).map((s) => (
                        <option key={s.clientId} value={s.clientId}>{s.client}</option>
                    ))}
                    </>
                    }
                    {field === 'employerId' &&
                    <>
                    <option value={selectedRow.employerId}>{selectedRow.employer}</option>
                    {options.filter((x) => x.employerId !== selectedRow.employerId).map((s) => (
                        <option key={s.employerId} value={s.employerId}>{s.name}</option>
                    ))}
                    </>
                    }
                </>
                :
                <>
                <option value={selectedRow[field]}>{selectedRow[field]}</option>
                {options.filter((x) => x !== selectedRow[field]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
                </>
                }
            </select>
            {/* {props.errors[field] && <div id="feedback">{props.errors[field]}</div>} */}
            </>
            }
            </>
            :
            <>
            {(field === 'clientId' || field === 'employerId' || field === 'injuryDate1') ?
            <>
            {field === 'clientId' &&
            <div id={field}>{selectedRow.client}</div>
            }
            {field === 'employerId' &&
            <div id={field}>{selectedRow.employer}</div>
            }
            {field === 'injuryDate1' &&
            <>
            <div id={field}>{selectedRow.injuryDate1}</div>
            {selectedRow.injuryDate2 &&
            <>
            <label htmlFor='injuryDate2'><u>{`DOI2:`}</u></label>
            <div id='injuryDate2'>{selectedRow.injuryDate2}</div>
            </>
            }
            </>
            }
            </>
            :
            <div id={field}>{selectedRow[field]}</div>
            }
            </>
            }
        </Grid>
    );
}