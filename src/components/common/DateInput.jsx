import { format, isValid, parse, subYears } from 'date-fns'
import { de } from 'date-fns/locale' 
import { Calendar as CalendarIcon } from 'lucide-react'
import { forwardRef, useRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import InputMask from 'react-input-mask' 
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/Calendar.css'

registerLocale('de', de)

const CustomInput = forwardRef(
    ({ value, onClick, onChange, className, placeholder }, ref) => {
        
        
        const beforeMaskedValueChange = (newState, oldState, userInput) => {
            let { value: val } = newState;
            
            
            const d = val.substring(0, 2).replace(/_/g, '');
            const m = val.substring(3, 5).replace(/_/g, '');
            const y = val.substring(6, 10).replace(/_/g, '');

            
            if (d.length === 1 && parseInt(d) > 3) return oldState;
            if (d.length === 2 && (parseInt(d) < 1 || parseInt(d) > 31)) return oldState;

            
            if (m.length === 1 && parseInt(m) > 1) return oldState;
            if (m.length === 2 && (parseInt(m) < 1 || parseInt(m) > 12)) return oldState;

            
            if (y.length === 1 && y[0] !== '1' && y[0] !== '2') return oldState;
            if (y.length === 2 && y !== '19' && y !== '20') return oldState;

            
            if (d.length === 2 && m.length === 2 && y.length === 4) {
                const parsedDate = parse(val, 'dd.MM.yyyy', new Date());
                if (!isValid(parsedDate) || format(parsedDate, 'dd.MM.yyyy') !== val) {
                    return oldState;
                }
            }

            return newState;
        };

        return (
            <div className="date-input-wrapper" style={{ position: 'relative', width: '100%' }}>
                {}
                <InputMask
                    mask="99.99.9999"
                    maskChar="_" 
                    value={value}
                    onChange={onChange}
                    onClick={onClick}
                    beforeMaskedValueChange={beforeMaskedValueChange}
                    placeholder={placeholder}
                >
                    {(inputProps) => (
                        <input
                            {...inputProps}
                            ref={ref}
                            className={className} 
                            autoComplete="off"
                        />
                    )}
                </InputMask>
                <CalendarIcon 
                    size={18} 
                    color="#94a3b8"
                    style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        pointerEvents: 'none' 
                    }}
                />
            </div>
        )
    }
)

const DateInput = ({
    value,
    onChange,
    placeholder = 'TT.MM.JJJJ',
    error,
    maxDate,
    className
}) => {
    const datePickerRef = useRef(null)

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const minYear = currentYear - 100

    const getValidDate = dateString => {
        
        if (!dateString || dateString.includes('_') || dateString.length < 10) return null
        
        const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date())
        if (isValid(parsedDate)) {
            const year = parsedDate.getFullYear()
            
            if (year >= minYear && year <= currentYear) {
                return parsedDate
            }
        }
        return null
    }

    const handleDateSelect = (date, event) => {
        
        if (event && event.type === 'change') return;
        const formattedDate = date ? format(date, 'dd.MM.yyyy') : ''
        onChange(formattedDate)
    }

    const handleDateRawChange = e => {
        
        onChange(e.target.value)
    }

    return (
        <div className='datepicker-container'>
            <DatePicker
                ref={datePickerRef}
                selected={getValidDate(value)}
                onChange={handleDateSelect}
                onChangeRaw={handleDateRawChange}
                value={value || ''} 
                dateFormat='dd.MM.yyyy'
                locale='de'
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                minDate={subYears(currentDate, 100)} 
                maxDate={maxDate || currentDate} 
                placeholderText={placeholder}
                customInput={
                    <CustomInput 
                        className={`modern-input ${error ? 'input-error' : ''} ${className || ''}`} 
                    />
                }
            />
        </div>
    )
}

export default DateInput