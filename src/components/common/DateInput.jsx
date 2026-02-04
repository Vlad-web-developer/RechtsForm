import { format, isValid, parse } from 'date-fns'
import { de } from 'date-fns/locale' 
import { Calendar as CalendarIcon } from 'lucide-react'
import { forwardRef, useRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../css/Calendar.css'

registerLocale('de', de)

const CustomInput = forwardRef(
    ({ value, onClick, onChange, className, placeholder }, ref) => (
        <div className="date-input-wrapper" style={{ position: 'relative', width: '100%' }}>
            <input
                value={value}
                onClick={onClick}
                onChange={onChange}
                ref={ref}
                className={className} 
                placeholder={placeholder}
                autoComplete="off"
            />
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
    ),
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

    const getValidDate = dateString => {
        if (!dateString) return null
        
        const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date())
        return isValid(parsedDate) ? parsedDate : null
    }

    const handleDateSelect = date => {
        
        const formattedDate = date ? format(date, 'dd.MM.yyyy') : ''
        onChange(formattedDate)
    }

    const handleDateRawChange = e => {
        const val = e.target.value
        
        if (/^[0-9.]*$/.test(val)) {
            onChange(val)
        }
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
                maxDate={maxDate || new Date()} 
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