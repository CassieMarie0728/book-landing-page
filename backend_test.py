import requests
import sys
import json
from datetime import datetime

class BookLandingPageAPITester:
    def __init__(self, base_url="https://be32229f-f254-4296-b44c-a3a5ba520ddc.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_response_keys=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if expected_response_keys:
                    for key in expected_response_keys:
                        if key in response_data:
                            print(f"   ✓ Found expected key: {key}")
                        else:
                            print(f"   ⚠️  Missing expected key: {key}")
                            success = False
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response_data}")

            self.test_results.append({
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": response_data
            })

            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "test_name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200,
            expected_response_keys=["status", "message"]
        )

    def test_newsletter_subscribe_new_email(self):
        """Test newsletter subscription with new email"""
        test_email = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com"
        return self.run_test(
            "Newsletter Subscribe - New Email",
            "POST",
            "api/subscribe",
            200,
            data={"email": test_email},
            expected_response_keys=["message", "email"]
        )

    def test_newsletter_subscribe_duplicate_email(self):
        """Test newsletter subscription with duplicate email"""
        test_email = "duplicate_test@example.com"
        
        # First subscription
        success1, response1 = self.run_test(
            "Newsletter Subscribe - First Time",
            "POST",
            "api/subscribe",
            200,
            data={"email": test_email},
            expected_response_keys=["message", "email"]
        )
        
        # Second subscription (should handle duplicate)
        success2, response2 = self.run_test(
            "Newsletter Subscribe - Duplicate Email",
            "POST",
            "api/subscribe",
            200,
            data={"email": test_email},
            expected_response_keys=["message", "email"]
        )
        
        return success1 and success2

    def test_newsletter_subscribe_invalid_email(self):
        """Test newsletter subscription with invalid email"""
        return self.run_test(
            "Newsletter Subscribe - Invalid Email",
            "POST",
            "api/subscribe",
            422,  # FastAPI validation error
            data={"email": "invalid-email"}
        )

    def test_subscriber_count(self):
        """Test subscriber count endpoint"""
        return self.run_test(
            "Subscriber Count",
            "GET",
            "api/subscribers/count",
            200,
            expected_response_keys=["count"]
        )

def main():
    print("🚀 Starting Book Landing Page API Tests")
    print("=" * 50)
    
    tester = BookLandingPageAPITester()
    
    # Run all tests
    tests = [
        tester.test_health_check,
        tester.test_newsletter_subscribe_new_email,
        tester.test_newsletter_subscribe_duplicate_email,
        tester.test_newsletter_subscribe_invalid_email,
        tester.test_subscriber_count
    ]
    
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Summary: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())