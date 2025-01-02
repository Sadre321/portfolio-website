import PropTypes from "prop-types";

const Loader = ({size,fullScreen=true,color="#FAEDCD"}) => {
  return (
    <div className={`flex ${fullScreen?"h-screen":""} items-center justify-center`}>
        <div className={`${size?`h-${size} w-${size}`:`h-16 w-16`} animate-spin rounded-full border-4 border-solid border-[${color&&color}] border-t-transparent`}></div>
      </div>
  )
}

export default Loader;
Loader.propTypes = {
  size:PropTypes.number,
  fullScreen:PropTypes.bool,
  color:PropTypes.string
}