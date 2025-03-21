Feature: URL Shortener API
  As a user, I want to shorten a URL, retrieve stats, and access the original URL.

  Scenario: Shorten a new URL
    Given I have a valid URL "http://example.com"
    When I send a request to shorten the URL
    Then I should receive a short URL in response

  Scenario: Redirect to the original URL
    Given I have a short URL
    When I access the short URL
    Then I should be redirected to the original URL

  Scenario: Get URL statistics
    Given I have a short URL
    When I request statistics for the short URL
    Then I should receive the stats with click count
