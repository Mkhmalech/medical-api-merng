import * as referral from '../controller/referral'

export const Referral = {
    // queries
    searchTests : referral.searchTests,
    searchContributorTests : referral.searchContributorTests,
    read_referral_test : referral.read_referral_test
}