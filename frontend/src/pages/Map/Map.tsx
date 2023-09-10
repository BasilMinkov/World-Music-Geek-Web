import React, {useEffect, useRef} from 'react'
import Layout from "../../hoc/Layout";
import SvgMap from 'svgmap';
import 'svgmap/dist/svgMap.min.css';
import './Map.scss'
import {useNavigate} from 'react-router-dom'
import countries from '../../assets/countries'

interface IMap {

}

const Map: React.FC<IMap> = (props) => {
    const navigate = useNavigate()

    useEffect(() => {

        const values = {
            RU: {posts: 249},
            AF: {posts: 587},
            AL: {posts: 4583},
            DZ: {posts: 4293}
        }

        new SvgMap({
            targetElementID: 'svgMap',
            showZoomReset: true,
            flagType: 'emoji',
            noDataText: "There are no posts yet :(",
            // showContinentSelector: true,
            // colorNoData: "#FFFFFF",
            // colorMin: "#EEEEEE",
            // colorMax: "#000000",
            data: {
                data: {
                    posts: {
                        name: 'Albums:',
                        format: '{0} posts',
                        thousandSeparator: ' ',
                    },
                },
                applyData: 'posts',
                values
            }
        })

        const handleClick = (event: any) => {
            event.preventDefault()
            // console.log('event.target.id', event.target.id)
            const country: string = event.target.id.substring(event.target.id.length - 2)
            // @ts-ignore
            navigate(`/library?tag=${countries[country]}`)
        }

        for (let key of Object.keys(values)) {
            const country: HTMLElement | null = document.getElementById(`svgMap-map-country-${key}`)
            country?.addEventListener('click', handleClick)
            // console.log(country)
        }

        return () => {
            const svgMap: HTMLElement | null = document.getElementById('svgMap')
            svgMap?.children[0].remove()

            for (let key of Object.keys(values)) {
                const country: HTMLElement | null = document.getElementById(`svgMap-map-country-${key}`)
                country?.removeEventListener('onclick', handleClick)
            }

            const svgToolTip: HTMLCollectionOf<Element> | null = document.getElementsByClassName('svgMap-tooltip')
            for (let i = 0; i < svgToolTip.length; i++) {
                svgToolTip[i].remove();
            }
        }

    }, [])

    return (
        <Layout>
            <div id="svgMap"></div>
        </Layout>
    )
}

export default Map