import moment from 'moment'
import React from 'react'
import MaskedInput from 'react-text-mask'
import {
    FormControl,
    InputLabel,
    Input,
    MenuItem,
    ListSubheader,
    Select,
    TextareaAutosize,
    TextField,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Divider ,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const types = {
    text: 'textField',
    radio: 'radioField',
    checkBox: 'checkboxField',
    date: 'dateField',
    multiple: 'multipleField',
    membership: 'membershipField',
    participation: 'participationField',
    volunteering: 'volunteeringField',
    textAreaField: 'textAreaField',
    phoneField: 'phoneField'
}

const getAgeLimit = (age) => {
    const date = new Date()
    return new Date((date.getFullYear() - age) + '-' + (date.getMonth() + 1) + '-' + date.getDate())
}

const phoneMaskCustom = (props) => {
    const { inputRef, ...other } = props;

    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
}

const phoneField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <FormControl key={ids[fieldsConfig.name]}>
            <InputLabel>{lang[fieldsConfig.name].label}</InputLabel>
            <Input
                error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
                value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
                required={fieldsConfig.name.required}
                inputComponent={phoneMaskCustom}
            />
            {errors[fieldsConfig.name] && (<p className='label-error2'>{lang[fieldsConfig.name].labelError}</p>)}
        </FormControl>
    )
}

const selectField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <FormControl
            key={ids[fieldsConfig.name]} variant='filled'
        >
            <InputLabel color='secondary' className={errors[fieldsConfig.name] ? 'label-error1' : ''}>{lang[fieldsConfig.name].label}</InputLabel>
            <Select
                key={ids[fieldsConfig.name]}
                value={fields[fieldsConfig.name] ? fields[fieldsConfig.name] : ''}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            >
                <MenuItem value='' disabled>
                    <em>{lang[fieldsConfig.name].label}</em>
                </MenuItem>
                {fieldsConfig.simple
                ? (
                    lang[fieldsConfig.name].options.map(x => (
                        <MenuItem key={fieldsConfig.name + x.value} value={x.value}>{x.label}</MenuItem>
                    ))
                )
                : (
                    [...Array(fieldsConfig.maxNumber + 1).keys()].map(x => (
                        <MenuItem key={fieldsConfig.name + x} value={x}>{x}</MenuItem>
                    ))
                )}
            </Select>
            {errors[fieldsConfig.name] && (
                <p className='label-error2'>{lang[fieldsConfig.name].labelError}</p>
            )}
        </FormControl>
    )
}

const selectGroupedField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <FormControl
            key={ids[fieldsConfig.name]} variant='filled'
        >
            <InputLabel className={errors[fieldsConfig.name] ? 'label-error1' : ''}>{lang[fieldsConfig.name].label}</InputLabel>
            <Select
                error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
                key={ids[fieldsConfig.name]}
                value={fields[fieldsConfig.name] ? fields[fieldsConfig.name] : ''}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            >
                <MenuItem value='' disabled>
                    <em>{lang[fieldsConfig.name].label}</em>
                </MenuItem>

                <ListSubheader>{lang[fieldsConfig.name].level[0].label}</ListSubheader>
                {lang[fieldsConfig.name].level[0].options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}

                <ListSubheader>{lang[fieldsConfig.name].level[1].label}</ListSubheader>
                {lang[fieldsConfig.name].level[1].options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            {errors[fieldsConfig.name] && (
                <p className='label-error2'>{lang[fieldsConfig.name].labelError}</p>
            )}
        </FormControl>
    )
}

const textAreaField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <div key={ids[fieldsConfig.name]}>
            {errors[fieldsConfig.name] && (<p className='error'>{lang[fieldsConfig.name].labelError}</p>)}
            {lang[fieldsConfig.name].info && (<p>{lang[fieldsConfig.name].info}</p>)}
            <TextareaAutosize
                className='textarea'
                rowsMin={2}
                placeholder={lang[fieldsConfig.name].label}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
                value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
            />
        </div>
    )
}

const textField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <TextField
            className={fieldsConfig.name}
            key={ids[fieldsConfig.name]}
            error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
            label={lang[fieldsConfig.name].label}
            type={fieldsConfig.otherType ? fieldsConfig.otherType : 'text'}
            color='primary'
            helperText={errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}
            variant='filled'
            required={fieldsConfig.name.required}
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            value={fields[fieldsConfig.name] === null ? '' : fields[fieldsConfig.name]}
        />
    )
}

const checkboxField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <FormControlLabel
            key={ids[fieldsConfig.name]}
            control={
                <Checkbox
                    checked={fields[fieldsConfig.name] !== null && fields[fieldsConfig.name]}
                    onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
                    required={fieldsConfig.name.required}
                />
            }
            label={lang[fieldsConfig.name].label}
        />
    )
}

const radio = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <RadioGroup
            value={fields[fieldsConfig.name]}
            onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
        >
            {fieldsConfig.radioOptions.map(option => (
                <div key={ids[option.name]}>
                    <FormControlLabel
                        key={ids[option.name]}
                        value={option.name} control={<Radio />} label={lang[fieldsConfig.name][option.name].label}
                    />
                </div>))}
        </RadioGroup>
    )
}

const radioField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <div className='fieldset sex'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
                <p>{errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}</p>
            </div>
            <div className='body'>
                {radio(fieldsConfig, propLang, lang, fields, errors, inputChange, ids)}
            </div>
        </div>
    )
}

const dateField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <MuiPickersUtilsProvider
            key={lang[fieldsConfig.name]}
            libInstance={moment} utils={MomentUtils}
            locale={propLang}
        >
            <DatePicker
                error={errors[fieldsConfig.name] ? errors[fieldsConfig.name] : false}
                format={fieldsConfig.format}
                openTo='year'
                views={fieldsConfig.views}
                label={lang[fieldsConfig.name].label}
                minDate={getAgeLimit(fieldsConfig.max)}
                maxDate={getAgeLimit(fieldsConfig.min)}
                value={fields[fieldsConfig.name]}
                helperText={errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}
                onChange={event => inputChange(event, fieldsConfig.name, fieldsConfig.type)}
            />
        </MuiPickersUtilsProvider>
    )
}

const multipleField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <div className='fieldset contacts'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
                <p>{errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}</p>
            </div>
            <div className='body'>
                {fieldsConfig.options.map(option => {
                    switch(option.type){
                        case types.text:
                            return (textField(option, propLang, lang, fields, errors, inputChange, ids))
                        case types.phoneField:
                            return (phoneField(option, propLang, lang, fields, errors, inputChange, ids))
                        case types.checkBox:
                            return (checkboxField(option, propLang, lang, fields, errors, inputChange, ids))
                        case types.date:
                            return (dateField(option, propLang, lang, fields, errors, inputChange, ids))
                    }
                })}
            </div>
        </div>
    )
}

const membershipField = (fieldsConfig, propLang, lang, fields, errors, inputChange, ids) => {
    return (
        <div className='fieldset membership'>
            <div className='head'>
                <p>{lang[fieldsConfig.name].label}</p>
                <p>{errors[fieldsConfig.name] && lang[fieldsConfig.name].labelError}</p>
            </div>
            <div className='body'>
                <p>{lang[fieldsConfig.name].title1}</p>
                <p>{lang[fieldsConfig.name].title2}</p>
                {radio(fieldsConfig, propLang, lang, fields, errors, inputChange, ids)}
                <div className='optional-fields'>
                    {fields.membership === 'membership_becomeMember' && (
                        <>
                            {fieldsConfig.options2.map(option => {
                                if (option.type === types.text) {
                                    return (textField(option, propLang, lang, fields, errors, inputChange, ids))
                                } else if (option.type === types.checkBox) {
                                    return (checkboxField(option, propLang, lang, fields, errors, inputChange, ids))
                                }
                            })}
                        </>
                    )}
                    {(fields.garde === 'gardeShared' && lang[fieldsConfig.name].gardeShared) && (
                        <p>{lang[fieldsConfig.name].gardeShared.info}</p>
                    )}
                    {((fields.garde === 'gardeMother' || fields.garde === 'gardeFather') && lang[fieldsConfig.name].gardeParentOption) && (
                    <>
                        <RadioGroup
                            className='radio'
                            value={fields[fieldsConfig.gardeParentOption.name]}
                            onChange={event => inputChange(event, fieldsConfig.gardeParentOption.name, fieldsConfig.gardeParentOption.type)}
                            row
                        >
                            <p>{lang[fieldsConfig.name].gardeParentOption.label}</p>
                            {fieldsConfig.gardeParentOption.radioOptions.map(option => (
                                <div key={ids[option.name]}>
                                    <FormControlLabel
                                        key={ids[option.name]}
                                        value={option.name} control={<Radio />} label={lang[fieldsConfig.name].gardeParentOption[option.name].label}
                                    />
                                </div>))}
                        </RadioGroup>
                    </>
                    )}
                    {(fields.garde === 'gardeOther' && lang[fieldsConfig.name].gardeOther) && (
                        textField(fieldsConfig.gardeOtherOption, propLang, lang[fieldsConfig.name], fields, errors, inputChange, ids)
                    )}
                    {(fields.redouble === 'redoubleYes' && lang[fieldsConfig.name].redoubleYesOption) && (
                        selectGroupedField(fieldsConfig.redoubleYesOption, propLang, lang[fieldsConfig.name], fields, errors, inputChange, ids)
                    )}
                    {(fields.daycareService === 'daycareServiceYes' && lang[fieldsConfig.name].daycareServiceYesName) && (
                        textField(fieldsConfig.daycareServiceYesName, propLang, lang[fieldsConfig.name], fields, errors, inputChange, ids)
                    )}
                    {(fields.daycareService === 'daycareServiceYes' && lang[fieldsConfig.name].daycareServiceYesPhone) && (
                        phoneField(fieldsConfig.daycareServiceYesPhone, propLang, lang[fieldsConfig.name], fields, errors, inputChange, ids)
                    )}
                </div>
            </div>
        </div>
    )
}

export default {
    selectField,
    selectGroupedField,
    phoneField,
    textField,
    textAreaField,
    radioField,
    dateField,
    checkboxField,
    multipleField,
    membershipField,
    phoneMaskCustom
}
