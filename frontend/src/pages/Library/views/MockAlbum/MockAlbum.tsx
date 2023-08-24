import React from 'react'

interface IMockAlbum {
    limit: number
}

const MockAlbum: React.FC<IMockAlbum> = (props) => {
    const { limit } = props
    const renderArray = new Array(limit).fill(
        <div className="library__mock">
            <div className="library__mock__image"></div>
            <div className="library__mock__author"></div>
            <div className="library__mock__title"></div>
        </div>
    )

    return (
        <>
            {renderArray}
        </>
    )
}

export default MockAlbum;