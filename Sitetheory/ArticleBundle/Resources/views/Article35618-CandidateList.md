Used to identify corresponding article at a glance.

Archive

```
<div class="profileList" id="candidateListPage">
    <p class="divCenter textCenter pullout">We are excited to announce our first five potential candidates (<a href="#candidateList">below</a>)! We need to convince them we have the support needed to run their campaign.</p>
    <h1>Progress</h1>
    <div class="borderDashedBold shellVerticalPadding" id="callToAction" ng-controller="CustomApi" options='{"controller":"/people/count", "onLoad": "fetch", "onTime": {"time": "10s", "method":"fetch"}}'>
        <p class="intro textCenter divCenter"><strong>If we get 500,000 people to sign up, we believe that we can convince these five people to run.</strong></p>
        <!-- hide as soon as angular loads -->
        <div class="loader" ng-hide="true"></div>
        <div layout="row" layout-wrap="" ng-cloak="">
            <div flex="100" flex-gt-sm="33" flex-order="2" flex-order-gt-sm="1">
                <div class="positionAnchor" id="signUpProgress">
                    <div class="positionAll" id="progressNumbers">
                        <div class="positionLeftBottom smallLabel fontBody salmonText" id="startNumber">0</div>
                        <div class="positionRightBottom smallLabel fontBody salmonText" id="endNumber">500K</div>
                        <div id="numberLine"></div>
                    </div>
                    <div class="positionAll" id="progressBarContainer">
                        <!-- this uses the dynamic countUp value and not the results.count directly (so that it animates) -->
                        <div id="progressBar" class="positionLeftTop salmon" style="max-width: 100%" ng-style="{'width':(100*(countUp.frameVal/500000))+'%'}"></div>
                    </div>
                </div>
            </div>
            <div flex="100" flex-gt-sm="33" flex-order="1" flex-order-gt-sm="2">
                <div class="divCenter textCenter">
                    <div class="divCenter" id="signUpLabel">
                        <div class="starLeft">
                            <div class="starRight">
                                <div class="starText fontPrimary salmonText">Right Now</div>
                            </div>
                        </div>
                    </div>
                    <div id="totalSignUp" class="borderDashed fontSecondary salmonText" count-up="" start-val="0" end-val="results.count" count-instance="countUp" duration="1.5" decimals="0" options="{easingFn: easingFn}" scroll-spy-event="elementFirstScrolledIntoView" scroll-spy=""></div>
                </div>
            </div>
            <div flex="100" flex-gt-sm="33" flex-order="3">
                <div class="joinForm pullRight" id="candidateJoin">
                    <p class="textCenter divCenter" hide-gt-sm=""><strong>Sign up and help us convince our new draftees to run!</strong></p>
                    <a id="joinForm" name="joinForm"></a>
                    <!-- Reuse Registration Form from shell -->
                    <form class="positionAnchor" name="Signup" ng-class="status" ng-cloak="" ng-cloak-reveal="" ng-controller="CustomApi" ng-sanitize="true" ng-submit="send('Signup') && customMethods.trackSignup('SignupButton', 'click')" options='{"controller": "/people", "redirect":{"url":"https://secure.actblue.com/contribute/page/bncsignup", "popup":false}}'>
                        <input type="hidden" name="utmSource" ng-value="model.data.utmSource">
                        <input type="hidden" name="utmMedium" ng-value="model.data.utmMedium">
                        <input type="hidden" name="utmCampaign" ng-value="model.data.utmCampaign">

                        <p class="message" ng-show="response.length" ng-bind-html="response"></p>
                        <ul class="listInline divCenter fontSecondary" ng-show="status !== 'success'">
                            <li>
                                <md-input-container>
                                    <label>Email</label>
                                    <input name="email" type="email" ng-pattern="options.pattern.email" ng-model="model.data.email" required="" md-no-asterisk="">
                                    <div ng-messages="Signup.email.$error" role="alert">
                                        <div ng-message-exp="['required', 'pattern']">Please enter a valid email.</div>
                                    </div>
                                </md-input-container>
                            </li>
                            <li>
                                <md-input-container>
                                    <label>Zip</label>
                                    <input name="zip" ng-pattern="options.pattern.zip" ng-model="model.data.zip" required="" md-no-asterisk="">
                                    <div ng-messages="Signup.zip.$error" role="alert">
                                        <div ng-message-exp="['required', 'pattern']">Please enter a valid zip code.</div>
                                    </div>
                                </md-input-container>
                            </li>
                            <li>
                                <button class="btn formSubmit" ng-disabled="Signup.$invalid" type="submit">{{ textSubmit|default(&#39;Count Me In&#39;) }}</button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <a name="candidateList"></a>
    <h1>Our Draftees</h1>
    <div class="borderDashedBold">
        <div id="profileList">
            <!-- hide as soon as angular loads -->
            <div class="loader" ng-hide="true"></div>
            <div layout="row" layout-wrap="">
                <!-- Profile Item 1 -->
                <div class="profileContainer" flex="100" flex-gt-xs="50">
                    <div class="profileItem" layout="column">
                        <div class="clearfix" flex-order="2" flex-order-gt-xs="1">
                            <div class="profileImage">
                                <a href="/candidates/linda-wayman"> <img src="//cdn.sitetheory.io/nest001/814-LindaWayman-xs.jpg" alt="Linda Wayman" > </a>
                            </div>
                            <h2>Linda Wayman</h2>
                            <h4>Educator</h4>
                            <p class="profileBody">Decades-long educator in North Philadelphia who who became a superintendent, but stepped down to become principal of a chronically failing high school, turning the school around. <a class="readMore fontBody" href="/candidates/linda-wayman">Read More</a></p>
                        </div>
                        <div class="profileExtra backgroundDark" flex-order="1" flex-order-gt-xs="2">
                            <div class="starLeft starWhite">
                                <div class="starRight starWhite">
                                    <div class="starText fontPrimary textCenter">Pennsylvania 1st</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Profile Item -->
                <!-- Profile Item 2 -->
                <div class="profileContainer" flex="100" flex-gt-xs="50">
                    <div class="profileItem" layout="column">
                        <div class="clearfix" flex-order="2" flex-order-gt-xs="1">
                            <div class="profileImage">
                                <a href="/candidates/jordyn-lexton"><img src="//cdn.sitetheory.io/nest001/816-JordynLexton-xs.jpg" alt="Jordyn Lexton" ></a>
                            </div>
                            <h2>Jordyn Lexton</h2>
                            <h4>Fellowship Founder</h4>
                            <p class="profileBody">Former teacher at Rikers Island prison; while campaigning to stop convicting children as adults, created Drive Change, a 1-year fellowship program in the food truck industry to help young people returning home from prison get jobs and education. <a class="readMore fontBody" href="/candidates/jordyn-lexton">Read More</a></p>
                        </div>
                        <div class="profileExtra backgroundDark" flex-order="1" flex-order-gt-xs="2">
                            <div class="starLeft starWhite">
                                <div class="starRight starWhite">
                                    <div class="starText fontPrimary textCenter">New York 12th</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Profile Item -->
                <!-- Profile Item 3 -->
                <div class="profileContainer" flex="100" flex-gt-xs="50">
                    <div class="profileItem" layout="column">
                        <div class="clearfix" flex-order="2" flex-order-gt-xs="1">
                            <div class="profileImage">
                                <a href="/candidates/kurt-rietema"> <img src="//cdn.sitetheory.io/nest001/818-KurtRietema-xs.jpg" alt="Kurt Rietema"></a>
                            </div>
                            <h2>Kurt Rietema</h2>
                            <h4>Youth Pastor</h4>
                            <p class="profileBody">Youth pastor for over a decade with YouthFront; started &ldquo;Neighbor to Neighbor&rdquo; to help immigrants and marginalized people become homeowners by creating fair, low-interest lending partnerships between churches and families that can&rsquo;t access traditional home mortgages. <a class="readMore fontBody" href="/candidates/kurt-rietema">Read More</a></p>
                        </div>
                        <div class="profileExtra backgroundDark" flex-order="1" flex-order-gt-xs="2">
                            <div class="starLeft starWhite">
                                <div class="starRight starWhite">
                                    <div class="starText fontPrimary textCenter">Kansas 3rd</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Profile Item -->
                <!-- Profile Item 4 -->
                <div class="profileContainer" flex="100" flex-gt-xs="50">
                    <div class="profileItem" layout="column">
                        <div class="clearfix" flex-order="2" flex-order-gt-xs="1">
                            <div class="profileImage">
                                <a href="candidates/chardo-richardson"> <img src="//cdn.sitetheory.io/nest001/815-ChardoRichardson-xs.jpg" alt="Chardo Richardson"></a>
                            </div>
                            <h2>Chardo Richardson</h2>
                            <h4>Civil Rights Lawyer</h4>
                            <p class="profileBody">Air Force veteran with five tours of duty in Iraq and Afghanistan; now President of Central Florida ACLU chapter, fighter for workers&rsquo; rights with Working America, and founded Think LegalEase, a series of YouTube videos to make the law accessible. <a class="readMore fontBody" href="candidates/chardo-richardson">Read More</a></p>
                        </div>
                        <div class="profileExtra backgroundDark" flex-order="1" flex-order-gt-xs="2">
                            <div class="starLeft starWhite">
                                <div class="starRight starWhite">
                                    <div class="starText fontPrimary textCenter">Florida 9th</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Profile Item -->
                <!-- Profile Item 5 -->
                <div class="profileContainer" flex="100" flex-gt-xs="50">
                    <div class="profileItem" layout="column">
                        <div class="clearfix" flex-order="2" flex-order-gt-xs="1">
                            <div class="profileImage">
                                <a href="/candidates/tynisha-tyson"> <img src="//cdn.sitetheory.io/nest001/820-TynishaTyson-xs.jpg" alt="Tynisha Tyson"></a>
                            </div>
                            <h2>Tynisha Tyson</h2>
                            <h4>Social Worker</h4>
                            <p class="profileBody">Social worker at Milner Elementary; works with children who suffer from abuse, neglect, and extreme poverty to be an anchor in their lives. Has actively continued working as a social worker to help kids most in need despite opportunities to &ldquo;move up.&rdquo; <a class="readMore fontBody" href="/candidates/tynisha-tyson">Read More</a></p>
                        </div>
                        <div class="profileExtra backgroundDark" flex-order="1" flex-order-gt-xs="2">
                            <div class="starLeft starWhite">
                                <div class="starRight starWhite">
                                    <div class="starText fontPrimary textCenter">Connecticut 1st</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Profile Item -->
            </div>
        </div>
    </div>
</div>

```