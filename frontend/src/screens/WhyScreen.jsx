import React from "react"
import {Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'balloon-css'
import '../css/Recipe.css'

const WhyScreen = () => {
    return(
        <main>
            <Container>
                <Row>
                    <Col>
                <h1>Why Nonsense Free Recipes?</h1>
                <p className = 'lead fs-4'>Simple. Most recipe sites are <strong>full</strong> of nonsense.</p>
                <br/>
                <p style = {{fontSize:"105%"}}>"As a child, my grandfather would go into the salt mines, clutching his tiny pail in his childish fist..." <strong style = {{fontSize:"110%"}}>No!</strong></p>
                <br/><br/>
                <p style = {{fontSize:"105%", marginTop:'-3rem'}}>"I make this recipe for my darling Everleighly and my little stinker Tuckergrayson (the 'gray' is silent!). Before I share the recipe, here's why vaccines make you gay..." <strong style = {{fontSize:"130%"}}>NO!</strong></p>
                <p style = {{fontSize:"105%"}}>
                    Don't even get me started on the darn pop-ups. Or the thousands upon thousands of autoplaying video ads that auto scroll to random places on the page whenever one of them loads, or the ten million trackers, or the multi-megabyte bandwidth load...
                    <br/><br/>
                </p>
                <p style = {{fontSize:"105%", marginTop: '-1rem'}}>
                    You want to know what's on this site? <strong>Recipes.</strong> That's it. <br/><br/>No nonsense. No ads. No videos. No stories. Some recipes might have content notes, but the recipe is always front and center. This site is easy to use on mobile, has no pop-ups, and won't make you go over your data limit on your phone plan.
                </p>
                <p class = 'lead fs-4'>
                    If this website saved you some time, some mobile data (it did), and some sanity (unquestionable), please consider donating.
                </p>
                <p style = {{fontSize:"105%"}}>
                    I don't run ads on this site and I never will, so it's solely supported by donations. A couple bucks goes a long way when you have a monthly database/domain bill. I appreciate any donations more than I can say.</p>
                    <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="CA5PD4LCTR7VS" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>
<p style = {{fontSize:"105%", marginTop:"1rem"}}>You know what they say; "if you're annoyed with something, make the better version yourself!" (Close enough.) Rock on, and if you read all this- go make something cool today 🤘🏻 </p>
<p style = {{fontSize:"105%"}}>
    P.S. Hit me up at <a className = 'balloon-tooltip' aria-label='j&#8203;@&#8203;j&#8203;h&#8203;a&#8203;n&#8203;s&#8203;e&#8203;n&#8203;.a&#8203;r&#8203;t' data-balloon-pos='right'>show email</a> if you want. I'm always down for development projects.
</p>

                </Col>
                </Row>
            </Container>
        </main>
    )
}

export default WhyScreen