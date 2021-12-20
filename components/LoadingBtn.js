const LoadingBtn = ({ type, children, className, onClick, loading }) => {
    
    return (
      <button
        type={type}
        onClick={onClick}
        className={`flex items-center justify-center gap-2 transition ${className}`}
      >
        {children}
        {loading && <Loader/>}
      </button>
    );
}

export default LoadingBtn


export const Loader = () => (
  <div className="h-4 w-4 border-[2px] border-b-transparent rounded-full  border-white animate-spin "></div>
);