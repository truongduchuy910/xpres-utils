## Usage

To use this template, you can clone the repository and install the dependencies:

```
npm i xpres-utils@latest
```

Then, you can create a simple Express application using the utilities provided by `xpres-utils`. Below is an example of how to set up a basic server that responds with "Hello World!" when accessed at the root URL.

```js
const express = require("express");
const { OK } = require("xpres-utils");
const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.status(OK).send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

| Code | Constant                        | Reason Phrase                       | Trường hợp sử dụng, khuyến nghị                                                                                  |
| ---- | ------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 100  | CONTINUE                        | Tiếp tục                            | Dùng cho kết nối HTTP khi client gửi yêu cầu lớn, server xác nhận đã nhận phần đầu, client tiếp tục gửi dữ liệu. |
| 101  | SWITCHING_PROTOCOLS             | Chuyển giao giao thức               | Khi client yêu cầu chuyển đổi giao thức (ví dụ từ HTTP sang WebSocket).                                          |
| 102  | PROCESSING                      | Đang xử lý                          | Dùng trong WebDAV để báo server đang xử lý, client nên đợi.                                                      |
| 103  | EARLY_HINTS                     | Gợi ý sớm                           | Gửi trước thông tin header cho client, giúp tải tài nguyên nhanh hơn.                                            |
| 200  | OK                              | Thành công                          | Trả về khi yêu cầu thành công, dữ liệu trả về như mong đợi.                                                      |
| 201  | CREATED                         | Đã tạo                              | Khi tạo mới tài nguyên (POST), trả về đối tượng vừa tạo.                                                         |
| 202  | ACCEPTED                        | Đã chấp nhận                        | Yêu cầu được nhận nhưng xử lý sau (xử lý bất đồng bộ).                                                           |
| 203  | NON_AUTHORITATIVE_INFORMATION   | Thông tin không xác thực            | Proxy trả về dữ liệu đã chỉnh sửa khác dữ liệu gốc từ server.                                                    |
| 204  | NO_CONTENT                      | Không có nội dung                   | Yêu cầu thành công, không có dữ liệu trả về (thường dùng với DELETE hoặc cập nhật không cần phản hồi).           |
| 205  | RESET_CONTENT                   | Đặt lại nội dung                    | Yêu cầu client làm mới giao diện, ví dụ làm trống form sau thao tác.                                             |
| 206  | PARTIAL_CONTENT                 | Nội dung một phần                   | Khi client yêu cầu tải một phần nội dung (hỗ trợ tải tiếp file bị ngắt quãng).                                   |
| 207  | MULTI_STATUS                    | Nhiều trạng thái                    | WebDAV trả về nhiều trạng thái cho các thao tác khác nhau trong một yêu cầu.                                     |
| 300  | MULTIPLE_CHOICES                | Nhiều lựa chọn                      | Có nhiều lựa chọn tài nguyên, client cần chọn một.                                                               |
| 301  | MOVED_PERMANENTLY               | Đã chuyển vĩnh viễn                 | Tài nguyên đã chuyển vĩnh viễn sang URL mới, nên redirect và cập nhật link.                                      |
| 302  | MOVED_TEMPORARILY               | Đã chuyển tạm thời                  | Tạm thời chuyển hướng sang URL khác (không nên lưu lại URL mới).                                                 |
| 303  | SEE_OTHER                       | Xem cái khác                        | Sau khi xử lý xong, redirect client sang tài nguyên khác (thường dùng sau POST/PUT).                             |
| 304  | NOT_MODIFIED                    | Không thay đổi                      | Client dùng cache, server xác nhận dữ liệu chưa thay đổi, không cần tải lại.                                     |
| 305  | USE_PROXY                       | Sử dụng proxy                       | Yêu cầu client truy cập qua proxy (ít dùng, có thể không được hỗ trợ).                                           |
| 307  | TEMPORARY_REDIRECT              | Chuyển hướng tạm thời               | Chuyển hướng tạm thời, phương thức yêu cầu không đổi (an toàn hơn 302).                                          |
| 308  | PERMANENT_REDIRECT              | Chuyển hướng vĩnh viễn              | Chuyển hướng vĩnh viễn, bảo toàn phương thức yêu cầu (an toàn hơn 301).                                          |
| 400  | BAD_REQUEST                     | Yêu cầu không hợp lệ                | Dữ liệu đầu vào sai, thiếu trường bắt buộc hoặc không hợp lệ.                                                    |
| 401  | UNAUTHORIZED                    | Không được phép                     | Yêu cầu xác thực, client cần gửi thông tin đăng nhập hợp lệ.                                                     |
| 402  | PAYMENT_REQUIRED                | Yêu cầu thanh toán                  | Dự phòng cho các dịch vụ yêu cầu thanh toán (thường không dùng nhiều).                                           |
| 403  | FORBIDDEN                       | Bị cấm                              | Server hiểu yêu cầu nhưng từ chối, không cấp quyền cho client.                                                   |
| 404  | NOT_FOUND                       | Không tìm thấy                      | Tài nguyên không tồn tại, URL sai hoặc đã bị xóa.                                                                |
| 405  | METHOD_NOT_ALLOWED              | Phương thức không được phép         | Phương thức (GET/POST/PUT/DELETE) không được hỗ trợ cho tài nguyên đó.                                           |
| 406  | NOT_ACCEPTABLE                  | Không chấp nhận                     | Server không thể trả dữ liệu với định dạng mà client yêu cầu (qua header Accept).                                |
| 407  | PROXY_AUTHENTICATION_REQUIRED   | Yêu cầu xác thực proxy              | Yêu cầu client xác thực với proxy trước khi truy cập tài nguyên.                                                 |
| 408  | REQUEST_TIMEOUT                 | Hết thời gian yêu cầu               | Client gửi yêu cầu quá lâu, server ngắt kết nối.                                                                 |
| 409  | CONFLICT                        | Xung đột                            | Xảy ra xung đột dữ liệu (ví dụ hai người cùng sửa một bản ghi).                                                  |
| 410  | GONE                            | Không còn tồn tại                   | Tài nguyên đã bị xóa vĩnh viễn, không còn trên server.                                                           |
| 411  | LENGTH_REQUIRED                 | Yêu cầu độ dài                      | Server yêu cầu client gửi Content-Length trong header.                                                           |
| 412  | PRECONDITION_FAILED             | Điều kiện tiên quyết thất bại       | Một điều kiện trong header (If-Match/If-None-Match) không được đáp ứng.                                          |
| 413  | REQUEST_TOO_LONG                | Yêu cầu quá lớn                     | Dữ liệu gửi lên quá lớn, cần kiểm tra và giới hạn kích thước upload.                                             |
| 414  | REQUEST_URI_TOO_LONG            | URI yêu cầu quá dài                 | URL quá dài, nên dùng phương thức POST thay vì GET với dữ liệu lớn.                                              |
| 415  | UNSUPPORTED_MEDIA_TYPE          | Loại phương tiện không được hỗ trợ  | Định dạng dữ liệu gửi lên không được hỗ trợ (ví dụ gửi XML khi chỉ nhận JSON).                                   |
| 416  | REQUESTED_RANGE_NOT_SATISFIABLE | Khoảng yêu cầu không thoả mãn       | Client yêu cầu phần dữ liệu không tồn tại (ví dụ tải file từ byte 1000 khi file chỉ có 500 byte).                |
| 417  | EXPECTATION_FAILED              | Mong đợi thất bại                   | Header Expect không được server hỗ trợ hoặc không đáp ứng được.                                                  |
| 418  | IM_A_TEAPOT                     | Tôi là một ấm trà                   | Mã trạng thái đùa (Easter egg), không dùng thực tế.                                                              |
| 419  | INSUFFICIENT_SPACE_ON_RESOURCE  | Không đủ không gian trên tài nguyên | Hết dung lượng lưu trữ, client cần giải phóng bộ nhớ hoặc giảm dữ liệu gửi lên.                                  |
| 420  | METHOD_FAILURE                  | Phương thức thất bại                | WebDAV, một phương thức không thực hiện được (không phổ biến).                                                   |
| 421  | MISDIRECTED_REQUEST             | Yêu cầu sai hướng                   | Yêu cầu gửi đến server không đúng, thường với HTTP/2, client nên kiểm tra lại địa chỉ gửi yêu cầu.               |
| 422  | UNPROCESSABLE_ENTITY            | Thực thể không thể xử lý            | Dữ liệu hợp lệ về cú pháp nhưng không hợp lệ về logic, thường dùng cho API REST (nhập thiếu, sai định dạng).     |
| 423  | LOCKED                          | Đã bị khoá                          | Tài nguyên bị khoá, không thể sửa đổi (WebDAV).                                                                  |
| 424  | FAILED_DEPENDENCY               | Phụ thuộc thất bại                  | Một yêu cầu bị lỗi do yêu cầu trước đó thất bại (WebDAV).                                                        |
| 426  | UPGRADE_REQUIRED                | Yêu cầu nâng cấp                    | Server yêu cầu client nâng cấp giao thức (ví dụ nâng cấp lên HTTPS).                                             |
| 428  | PRECONDITION_REQUIRED           | Yêu cầu điều kiện tiên quyết        | Server yêu cầu client phải gửi điều kiện (If-Match) để tránh ghi đè ngoài ý muốn.                                |
| 429  | TOO_MANY_REQUESTS               | Quá nhiều yêu cầu                   | Client gửi quá nhiều yêu cầu trong thời gian ngắn (quá tải, cần giới hạn rate limit).                            |
| 431  | REQUEST_HEADER_FIELDS_TOO_LARGE | Trường tiêu đề yêu cầu quá lớn      | Header quá dài/có quá nhiều trường, cần kiểm tra và giới hạn header gửi lên.                                     |
| 451  | UNAVAILABLE_FOR_LEGAL_REASONS   | Không khả dụng do lý do pháp lý     | Tài nguyên bị giới hạn truy cập do lý do pháp lý (theo yêu cầu pháp luật).                                       |
| 500  | INTERNAL_SERVER_ERROR           | Lỗi máy chủ nội bộ                  | Lỗi không xác định trên server, nên ghi log và thông báo rõ ràng cho dev.                                        |
| 501  | NOT_IMPLEMENTED                 | Chưa được thực hiện                 | Server chưa hỗ trợ phương thức này, nên thông báo rõ cho client.                                                 |
| 502  | BAD_GATEWAY                     | Cổng không hợp lệ                   | Server trung gian nhận phản hồi không hợp lệ từ server gốc (thường gặp với proxy/gateway).                       |
| 503  | SERVICE_UNAVAILABLE             | Dịch vụ không khả dụng              | Server đang bảo trì hoặc quá tải, nên thông báo và hướng dẫn client thử lại sau.                                 |
| 504  | GATEWAY_TIMEOUT                 | Hết thời gian cổng                  | Server trung gian không nhận được phản hồi kịp từ server gốc.                                                    |
| 505  | HTTP_VERSION_NOT_SUPPORTED      | Phiên bản HTTP không được hỗ trợ    | Client dùng phiên bản HTTP mà server không hỗ trợ.                                                               |
| 507  | INSUFFICIENT_STORAGE            | Không đủ bộ nhớ lưu trữ             | Server không đủ dung lượng lưu trữ để hoàn thành yêu cầu.                                                        |
| 511  | NETWORK_AUTHENTICATION_REQUIRED | Yêu cầu xác thực mạng               | Client cần xác thực với mạng (thường gặp ở captive portal Wi-Fi).                                                |
